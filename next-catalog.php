<?php
// Public, read-only content adapter for the Next.js frontend. No customer data.
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    header('Allow: GET'); http_response_code(405); echo json_encode(['ok'=>false]); exit;
}
require_once __DIR__ . '/../app/db.php';
function mtm_public_rows(string $table, array $allowed, string $where, array $params = [], string $order = 'id ASC'): array {
    $existing = db()->query('SHOW COLUMNS FROM `' . $table . '`')->fetchAll(PDO::FETCH_COLUMN);
    $fields = array_values(array_intersect($allowed, $existing));
    if (!$fields) return [];
    $sql = 'SELECT `' . implode('`,`', $fields) . '` FROM `' . $table . '` WHERE ' . $where . ' ORDER BY ' . $order;
    $stmt = db()->prepare($sql); $stmt->execute($params); return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
try {
    $lang = (string)($_GET['lang'] ?? 'en');
    if (!in_array($lang, ['en','fr','es','de','it','pl','nl','ja','zh'], true)) { http_response_code(400); echo json_encode(['ok'=>false,'error'=>'Invalid language']); exit; }
    $fields = ['id','title','slug','url_base','lang','original_id','excerpt','content','price','currency','duration','duration_days','location','featured_image','meta_title','meta_description','hero_intro','availability_text','availability_type','journey_style','stay_info','transport_info','best_for','departure_type','highlights','highlight_1','highlight_2','highlight_3','group_type','category_id','updated_at'];
    $result = ['ok'=>true,'lang'=>$lang];
    $slug = trim((string)($_GET['slug'] ?? ''));
    if ($slug !== '') {
        if (strlen($slug) > 250) throw new InvalidArgumentException('Invalid slug');
        $rows = mtm_public_rows('services', $fields, "status = 'published' AND lang = ? AND slug = ?", [$lang,$slug]);
        if (!$rows) { http_response_code(404); echo json_encode(['ok'=>false,'error'=>'Tour not found']); exit; }
        $s = $rows[0];
        $children = [
          'images'=>['service_images',['id','image_path','alt_text','caption','sort_order'],'sort_order ASC, id ASC'],
          'days'=>['service_itinerary',['id','day_number','title','details','description','image_path','meals','sort_order'],'day_number ASC, sort_order ASC'],
          'includes'=>['service_includes',['id','title','details','is_active','sort_order'],'sort_order ASC, id ASC'],
          'accommodations'=>['service_accommodations',['id','name','location','accommodation_type','stars','days','nights','image_url','room_details','meals','description','upgrade_details','substitution_note','is_active','sort_order'],'sort_order ASC, id ASC'],
          'faqs'=>['service_faq',['id','question','answer','sort_order'],'sort_order ASC, id ASC'],
          'departures'=>['service_departures',['id','start_date','end_date','seats','status','price_override'],'start_date ASC, id ASC']
        ];
        foreach ($children as $key=>$spec) {
            $where = 'service_id = ?'; $params = [$s['id']];
            if ($key === 'departures') { $where .= " AND status != 'hidden' AND start_date >= ?"; $params[] = date('Y-m-d'); }
            $s[$key] = mtm_public_rows($spec[0],$spec[1],$where,$params,$spec[2]);
        }
        $root = $s['original_id'] ?: $s['id'];
        $s['translations'] = mtm_public_rows('services',['id','lang','slug','url_base'],"status = 'published' AND (id = ? OR original_id = ?)",[$root,$root]);
        $result['service']=$s;
    } else {
        $result['services']=mtm_public_rows('services',array_diff($fields,['content','highlights']),"status = 'published' AND lang = ?",[$lang]);
        $result['categories']=mtm_public_rows('service_categories',['id','name','slug','sort_order'],'1=1',[],'sort_order ASC, id ASC');
        $result['posts']=mtm_public_rows('blog_posts',['id','title','slug','lang','excerpt','content','featured_image','meta_title','meta_description','published_at','updated_at','author_name','category'],"status = 'published' AND lang = ?",[$lang],'id DESC');
        $result['pages']=mtm_public_rows('pages',['id','title','slug','lang','excerpt','content','hero_image','hero_subtitle','meta_title','meta_description','page_type'],"status = 'published' AND lang = ?",[$lang]);
    }
    header('Cache-Control: public, max-age=60');
    echo json_encode($result, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_THROW_ON_ERROR);
} catch (Throwable $e) {
    error_log('MTM public catalogue error: ' . $e->getMessage());
    http_response_code(503); header('Cache-Control: no-store'); echo json_encode(['ok'=>false,'error'=>'Catalogue temporarily unavailable']);
}
