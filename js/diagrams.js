/* Scout Hub v18：技能 SVG 逐步圖解庫（純手寫 vector，offline 用得） */
var DIAGRAMS = {};

/* ── 指南針八方位 ── */
DIAGRAMS.compass = '<svg viewBox="0 0 180 180" width="180" height="180" role="img" aria-label="指南針八方位圖">'
+ '<circle cx="90" cy="90" r="70" fill="#fff" stroke="#333" stroke-width="3"/>'
+ '<line x1="90" y1="20" x2="90" y2="34" stroke="#333" stroke-width="3"/>'
+ '<line x1="90" y1="146" x2="90" y2="160" stroke="#333" stroke-width="3"/>'
+ '<line x1="20" y1="90" x2="34" y2="90" stroke="#333" stroke-width="3"/>'
+ '<line x1="146" y1="90" x2="160" y2="90" stroke="#333" stroke-width="3"/>'
+ '<polygon points="90,30 100,90 90,82 80,90" fill="#C62828"/>'
+ '<polygon points="90,150 100,90 90,98 80,90" fill="#999"/>'
+ '<circle cx="90" cy="90" r="6" fill="#333"/>'
+ '<text x="90" y="16" text-anchor="middle" font-size="14" font-weight="bold" fill="#C62828">N 北</text>'
+ '<text x="90" y="176" text-anchor="middle" font-size="14" font-weight="bold">S 南</text>'
+ '<text x="6" y="95" font-size="14" font-weight="bold">W 西</text>'
+ '<text x="162" y="95" font-size="14" font-weight="bold">E 東</text>'
+ '<text x="140" y="48" font-size="11" fill="#666">NE</text>'
+ '<text x="140" y="142" font-size="11" fill="#666">SE</text>'
+ '<text x="22" y="142" font-size="11" fill="#666">SW</text>'
+ '<text x="22" y="48" font-size="11" fill="#666">NW</text>'
+ '</svg>';

/* ── 背囊分層 ── */
DIAGRAMS.pack = '<svg viewBox="0 0 170 200" width="170" height="200" role="img" aria-label="背囊分層圖">'
+ '<rect x="35" y="8" width="100" height="32" rx="6" fill="#C8E6C9" stroke="#2E7D32" stroke-width="2"/>'
+ '<text x="85" y="28" text-anchor="middle" font-size="12">頂：雨衣/小食</text>'
+ '<rect x="35" y="42" width="100" height="42" rx="6" fill="#FFE0B2" stroke="#E65100" stroke-width="2"/>'
+ '<text x="85" y="59" text-anchor="middle" font-size="12">重嘢貼背</text>'
+ '<text x="85" y="74" text-anchor="middle" font-size="12">水/爐</text>'
+ '<rect x="35" y="86" width="100" height="42" rx="6" fill="#BBDEFB" stroke="#1565C0" stroke-width="2"/>'
+ '<text x="85" y="103" text-anchor="middle" font-size="12">衫/個人物品</text>'
+ '<text x="85" y="118" text-anchor="middle" font-size="12">常用放外</text>'
+ '<rect x="35" y="130" width="100" height="42" rx="6" fill="#E1BEE7" stroke="#6A1B9A" stroke-width="2"/>'
+ '<text x="85" y="147" text-anchor="middle" font-size="12">底：睡袋</text>'
+ '<text x="85" y="162" text-anchor="middle" font-size="12">輕而大件</text>'
+ '<text x="85" y="190" text-anchor="middle" font-size="11" fill="#666">外掛：營柱/地墊</text>'
+ '</svg>';

/* ── 追蹤符號（6 個） ── */
DIAGRAMS.track = {
arrow: '<svg viewBox="0 0 90 60" width="90" height="60"><line x1="10" y1="30" x2="68" y2="30" stroke="#37474F" stroke-width="6" stroke-linecap="round"/><polyline points="52,14 72,30 52,46" fill="none" stroke="#37474F" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
circle: '<svg viewBox="0 0 90 60" width="90" height="60"><circle cx="45" cy="30" r="18" fill="none" stroke="#37474F" stroke-width="6"/></svg>',
cross: '<svg viewBox="0 0 90 60" width="90" height="60"><line x1="27" y1="12" x2="63" y2="48" stroke="#37474F" stroke-width="6" stroke-linecap="round"/><line x1="63" y1="12" x2="27" y2="48" stroke="#37474F" stroke-width="6" stroke-linecap="round"/></svg>',
turn: '<svg viewBox="0 0 90 60" width="90" height="60"><path d="M15,50 H55 V24" fill="none" stroke="#37474F" stroke-width="6" stroke-linecap="round"/><polyline points="43,34 55,20 67,34" fill="none" stroke="#37474F" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
water: '<svg viewBox="0 0 90 60" width="90" height="60"><path d="M8,32 Q20,16 32,32 T56,32 T80,32" fill="none" stroke="#1565C0" stroke-width="5" stroke-linecap="round"/></svg>',
msg: '<svg viewBox="0 0 90 60" width="90" height="60"><polygon points="45,8 76,52 14,52" fill="none" stroke="#37474F" stroke-width="6" stroke-linejoin="round"/><circle cx="45" cy="40" r="4" fill="#37474F"/></svg>'
};

/* ── 平結 3 步（紅 vs 藍：左壓右） ── */
DIAGRAMS.reef = [
'<svg viewBox="0 0 170 95" width="170" height="95"><line x1="12" y1="47" x2="158" y2="47" stroke="#C62828" stroke-width="8" stroke-linecap="round"/><line x1="85" y1="8" x2="85" y2="87" stroke="#1565C0" stroke-width="8" stroke-linecap="round"/></svg>',
'<svg viewBox="0 0 170 95" width="170" height="95"><line x1="12" y1="47" x2="158" y2="47" stroke="#C62828" stroke-width="8" stroke-linecap="round"/><circle cx="85" cy="47" r="21" fill="none" stroke="#1565C0" stroke-width="8"/><line x1="85" y1="8" x2="85" y2="26" stroke="#1565C0" stroke-width="8" stroke-linecap="round"/><line x1="85" y1="68" x2="85" y2="87" stroke="#1565C0" stroke-width="8" stroke-linecap="round"/></svg>',
'<svg viewBox="0 0 170 95" width="170" height="95"><ellipse cx="60" cy="50" rx="26" ry="18" fill="none" stroke="#C62828" stroke-width="8"/><ellipse cx="110" cy="50" rx="26" ry="18" fill="none" stroke="#1565C0" stroke-width="8"/><line x1="60" y1="32" x2="60" y2="8" stroke="#C62828" stroke-width="8" stroke-linecap="round"/><line x1="110" y1="32" x2="110" y2="8" stroke="#1565C0" stroke-width="8" stroke-linecap="round"/><line x1="48" y1="66" x2="32" y2="88" stroke="#C62828" stroke-width="8" stroke-linecap="round"/><line x1="122" y1="66" x2="138" y2="88" stroke="#1565C0" stroke-width="8" stroke-linecap="round"/></svg>'
];

/* ── 八字結 3 步 ── */
DIAGRAMS.fig8 = [
'<svg viewBox="0 0 170 95" width="170" height="95"><circle cx="85" cy="52" r="28" fill="none" stroke="#6D4C41" stroke-width="8"/><line x1="85" y1="8" x2="85" y2="24" stroke="#6D4C41" stroke-width="8" stroke-linecap="round"/><line x1="85" y1="80" x2="85" y2="90" stroke="#6D4C41" stroke-width="8" stroke-linecap="round"/></svg>',
'<svg viewBox="0 0 170 95" width="170" height="95"><circle cx="85" cy="52" r="28" fill="none" stroke="#6D4C41" stroke-width="8"/><circle cx="85" cy="52" r="15" fill="none" stroke="#6D4C41" stroke-width="6"/><line x1="85" y1="8" x2="85" y2="24" stroke="#6D4C41" stroke-width="8" stroke-linecap="round"/><line x1="85" y1="80" x2="85" y2="90" stroke="#6D4C41" stroke-width="8" stroke-linecap="round"/></svg>',
'<svg viewBox="0 0 170 95" width="170" height="95"><ellipse cx="85" cy="32" rx="15" ry="14" fill="none" stroke="#6D4C41" stroke-width="8"/><ellipse cx="85" cy="63" rx="15" ry="14" fill="none" stroke="#6D4C41" stroke-width="8"/><line x1="85" y1="6" x2="85" y2="18" stroke="#6D4C41" stroke-width="8" stroke-linecap="round"/><line x1="85" y1="77" x2="85" y2="90" stroke="#6D4C41" stroke-width="8" stroke-linecap="round"/></svg>'
];

/* ── 稱人結 4 步（兔仔故事：出洞→繞樹→返洞） ── */
DIAGRAMS.bowline = [
'<svg viewBox="0 0 170 95" width="170" height="95"><circle cx="85" cy="58" r="20" fill="none" stroke="#2E7D32" stroke-width="8"/><line x1="85" y1="8" x2="85" y2="38" stroke="#2E7D32" stroke-width="8" stroke-linecap="round"/></svg>',
'<svg viewBox="0 0 170 95" width="170" height="95"><circle cx="85" cy="58" r="20" fill="none" stroke="#2E7D32" stroke-width="8"/><line x1="85" y1="8" x2="85" y2="38" stroke="#2E7D32" stroke-width="8" stroke-linecap="round"/><line x1="85" y1="90" x2="85" y2="30" stroke="#F9A825" stroke-width="8" stroke-linecap="round"/><polyline points="77,40 85,28 93,40" fill="none" stroke="#F9A825" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
'<svg viewBox="0 0 170 95" width="170" height="95"><circle cx="85" cy="62" r="18" fill="none" stroke="#2E7D32" stroke-width="8"/><line x1="85" y1="8" x2="85" y2="44" stroke="#2E7D32" stroke-width="8" stroke-linecap="round"/><ellipse cx="85" cy="28" rx="16" ry="11" fill="none" stroke="#F9A825" stroke-width="7"/><line x1="85" y1="39" x2="85" y2="52" stroke="#F9A825" stroke-width="7" stroke-linecap="round"/></svg>',
'<svg viewBox="0 0 170 95" width="170" height="95"><circle cx="62" cy="55" r="30" fill="none" stroke="#2E7D32" stroke-width="8"/><circle cx="108" cy="42" r="11" fill="none" stroke="#2E7D32" stroke-width="8"/><line x1="108" y1="6" x2="108" y2="31" stroke="#2E7D32" stroke-width="8" stroke-linecap="round"/><path d="M108,53 C108,66 96,70 92,80" fill="none" stroke="#F9A825" stroke-width="7" stroke-linecap="round"/></svg>'
];
