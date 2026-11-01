/* architecture.js – the inline SVG architecture diagram */
(function () {
  'use strict';
  var NS = (window.EC2V = window.EC2V || {});

  function packet(color, icon, steps, pathId, dur, extra) {
    var hold = extra && extra.hold;
    var motion = hold
      ? '<animateMotion dur="' + dur + '" repeatCount="indefinite" keyPoints="0;0;1" keyTimes="0;.5;1" calcMode="linear"><mpath href="#' + pathId + '"/></animateMotion>' +
        '<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.5;.56;.95;1" dur="' + dur + '" repeatCount="indefinite"/>'
      : '<animateMotion dur="' + dur + '" repeatCount="indefinite" calcMode="linear"><mpath href="#' + pathId + '"/></animateMotion>' +
        '<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.08;.9;1" dur="' + dur + '" repeatCount="indefinite"/>';
    return '<g class="packet" data-steps="' + steps + '" filter="url(#glow)">' +
      '<circle r="17" fill="' + color + '" fill-opacity=".25" stroke="' + color + '" stroke-width="2"/>' +
      '<text text-anchor="middle" dy="6" font-size="18">' + icon + '</text>' + motion + '</g>';
  }

  var SVG =
'<svg id="diagram" viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" aria-label="Diagram of an EC2 instance running Apache inside a public subnet of a VPC, reachable from a laptop through the Internet and an Internet Gateway">' +
'<title>EC2 instance running Apache in a public subnet</title>' +
'<defs>' +
  '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a1428"/><stop offset="1" stop-color="#14305c"/></linearGradient>' +
  '<pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#6f8fd0" opacity=".25"/></pattern>' +
  '<filter id="glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
  '<marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ff9f43"/></marker>' +
  '<marker id="arrg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#2ed573"/></marker>' +
  '<marker id="arrb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#8aa0c8"/></marker>' +
  '<path id="path-in" d="M190,295 L540,295"/>' +
  '<path id="path-out" d="M540,325 L190,325"/>' +
  '<path id="path-pkg" d="M290,295 L540,295"/>' +
'</defs>' +
'<rect width="1200" height="640" fill="url(#bg)"/>' +
'<rect width="1200" height="640" fill="url(#dots)"/>' +

/* containers: region, VPC, public subnet */
'<g class="el" data-from="2">' +
  '<rect x="330" y="20" width="850" height="600" rx="18" fill="#10264d" fill-opacity=".35" stroke="#4f8bff" stroke-width="2" stroke-dasharray="10 6"/>' +
  '<text x="352" y="48" class="lbl" fill="#8db4ff">AWS Region · ap-south-1 (Mumbai)</text>' +
  '<rect x="395" y="70" width="765" height="505" rx="14" fill="#0e3a45" fill-opacity=".35" stroke="#19c3b1" stroke-width="2.5"/>' +
  '<text x="415" y="98" class="lbl" fill="#5eead4">VPC · 10.0.0.0/16 · Ravi\'s private campus</text>' +
  '<rect x="470" y="115" width="670" height="440" rx="12" fill="#4a3a10" fill-opacity=".3" stroke="#f5b942" stroke-width="2"/>' +
  '<text x="490" y="142" class="lbl small" fill="#f8d27a">Public subnet · 10.0.1.0/24 · AZ ap-south-1a</text>' +
  '<rect x="905" y="122" width="225" height="26" rx="13" fill="#2a2208" stroke="#f5b942"/>' +
  '<text x="1017" y="139" text-anchor="middle" class="small" fill="#ffe29a">Public IP 203.0.113.25</text>' +
'</g>' +

/* wires first */
'<g class="el" data-from="2">' +
  '<line x1="180" y1="295" x2="548" y2="295" stroke="#5b7bb8" stroke-width="2" stroke-dasharray="5 5" opacity=".75"/>' +
  '<line x1="180" y1="325" x2="548" y2="325" stroke="#5b7bb8" stroke-width="2" stroke-dasharray="5 5" opacity=".75"/>' +
'</g>' +

/* step 1 cards */
'<g class="el" data-from="1" data-until="1">' +
  '<line x1="290" y1="165" x2="546" y2="280" stroke="#8aa0c8" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#arrb)"/>' +
  '<line x1="290" y1="280" x2="546" y2="330" stroke="#8aa0c8" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#arrb)"/>' +
  '<line x1="290" y1="395" x2="546" y2="380" stroke="#8aa0c8" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#arrb)"/>' +
  '<rect x="40" y="120" width="250" height="90" rx="12" fill="#14305c" stroke="#5aa9ff" stroke-width="2"/>' +
  '<text x="60" y="150" class="lbl" fill="#bcd6ff">📀 AMI</text>' +
  '<text x="60" y="173" class="small" fill="#e8eefc">Amazon Linux 2023</text>' +
  '<text x="60" y="193" class="tiny" fill="#8aa0c8">ready-made OS template</text>' +
  '<rect x="40" y="235" width="250" height="90" rx="12" fill="#14305c" stroke="#5aa9ff" stroke-width="2"/>' +
  '<text x="60" y="265" class="lbl" fill="#bcd6ff">🧩 Instance type</text>' +
  '<text x="60" y="288" class="small" fill="#e8eefc">t3.micro</text>' +
  '<text x="60" y="308" class="tiny" fill="#8aa0c8">2 vCPU · 1 GiB RAM</text>' +
  '<rect x="40" y="350" width="250" height="90" rx="12" fill="#14305c" stroke="#5aa9ff" stroke-width="2"/>' +
  '<text x="60" y="380" class="lbl" fill="#bcd6ff">💽 Storage</text>' +
  '<text x="60" y="403" class="small" fill="#e8eefc">8 GiB gp3 EBS volume</text>' +
  '<text x="60" y="423" class="tiny" fill="#8aa0c8">the instance\'s hard disk</text>' +
'</g>' +

/* internet cloud */
'<g class="el" data-from="2">' +
  '<path d="M218,338 C196,338 196,304 222,302 C222,276 262,268 276,290 C300,280 318,308 300,322 C308,338 296,338 290,338 Z" fill="#1b3a6e" stroke="#7aa7ff" stroke-width="2"/>' +
  '<text x="255" y="362" text-anchor="middle" class="small halo" fill="#bcd6ff">Internet</text>' +
'</g>' +

/* IGW */
'<g class="el" data-from="2">' +
  '<rect x="365" y="270" width="60" height="70" rx="8" fill="#12363f" stroke="#19c3b1" stroke-width="2.5"/>' +
  '<path d="M380,332 V305 a15,15 0 0 1 30,0 V332" fill="none" stroke="#5eead4" stroke-width="3"/>' +
  '<text x="395" y="364" text-anchor="middle" class="tiny halo" fill="#5eead4">Internet Gateway</text>' +
'</g>' +

/* laptop */
'<g class="el" data-from="2">' +
  '<rect x="40" y="245" width="130" height="85" rx="6" fill="#0b1a38" stroke="#cbd5e1" stroke-width="2"/>' +
  '<rect x="25" y="336" width="160" height="10" rx="4" fill="#cbd5e1"/>' +
  '<text x="105" y="292" text-anchor="middle" class="tiny" fill="#8aa0c8" data-x="1">Terminal / Browser</text>' +
  '<text x="105" y="372" text-anchor="middle" class="small" fill="#e8eefc">Your laptop</text>' +
  '<text x="105" y="396" text-anchor="middle" class="tiny" fill="#ffd166">🔑 my-key.pem</text>' +
'</g>' +
'<g class="el" data-from="7">' +
  '<rect x="46" y="251" width="118" height="73" rx="4" fill="#0f2a1c"/>' +
  '<text x="105" y="270" text-anchor="middle" class="tiny" fill="#8aa0c8">203.0.113.25</text>' +
  '<text x="105" y="298" text-anchor="middle" class="small" fill="#2ed573">Hello from</text>' +
  '<text x="105" y="316" text-anchor="middle" class="small" fill="#2ed573">Apache!</text>' +
'</g>' +

/* security group */
'<g class="el" data-from="3">' +
  '<rect x="510" y="165" width="590" height="355" rx="12" fill="none" stroke="#c084fc" stroke-width="2.5" stroke-dasharray="7 5"/>' +
  '<text x="530" y="188" class="small" fill="#d8b4fe">🛡️ Security Group · virtual firewall</text>' +
  '<rect x="530" y="484" width="250" height="26" rx="13" fill="#2a1647" stroke="#c084fc"/>' +
  '<text x="655" y="502" text-anchor="middle" class="small" fill="#e9d5ff">SSH · TCP 22 · My IP only</text>' +
  '<rect x="800" y="484" width="280" height="26" rx="13" fill="#0f2a1c" stroke="#2ed573"/>' +
  '<text x="940" y="502" text-anchor="middle" class="small" fill="#b6f5cd">HTTP · TCP 80 · Anywhere (0.0.0.0/0)</text>' +
'</g>' +

/* EC2 instance */
'<g class="el" data-from="1" data-until="3"><rect x="550" y="200" width="510" height="270" rx="12" fill="#0f2447" stroke="#8aa0c8" stroke-width="2" stroke-dasharray="8 6"/></g>' +
'<g class="el" data-from="4"><rect x="550" y="200" width="510" height="270" rx="12" fill="#0f2447" stroke="#ff9900" stroke-width="3"/></g>' +
'<g class="el" data-from="1"><text x="574" y="229" class="lbl" font-size="14" fill="#ffb84d" style="font-size:14px">🖥️ EC2 instance · t3.micro</text></g>' +
'<text class="el small" data-from="1" data-until="3" x="1036" y="229" text-anchor="end" fill="#9fb0d0">○ not launched</text>' +
'<text class="el small" data-from="4" x="1036" y="229" text-anchor="end" fill="#2ed573">● running</text>' +
'<g class="el" data-from="6">' +
  '<rect x="800" y="208" width="120" height="26" rx="13" fill="#3b1219" stroke="#ff5d73"/>' +
  '<text x="860" y="226" text-anchor="middle" class="small" fill="#ffb3be">🪶 Apache :80</text>' +
'</g>' +

/* terminal */
'<g class="el" data-from="1">' +
  '<rect x="570" y="248" width="470" height="200" rx="8" fill="#07101f" stroke="#2b3f6b"/>' +
  '<rect x="570" y="248" width="470" height="24" rx="8" fill="#16264a"/>' +
  '<circle cx="586" cy="260" r="4" fill="#ff5f57"/><circle cx="602" cy="260" r="4" fill="#febc2e"/><circle cx="618" cy="260" r="4" fill="#28c840"/>' +
  '<text id="term-title" x="636" y="264" class="tiny mono" fill="#9fb0d0" style="font-size:11.5px"></text>' +
  '<g id="term-lines"></g>' +
'</g>' +

/* packets last */
packet('#ffd166', '🔑', '5', 'path-in', '3s') +
packet('#5aa9ff', '📦', '6', 'path-pkg', '2.6s') +
packet('#ff9f43', '✉️', '7', 'path-in', '4s') +
packet('#2ed573', '📄', '7', 'path-out', '4s', { hold: true }) +

/* static arrows for reduced motion */
'<g class="sarrow" data-steps="5,6,7" style="display:none"><line x1="200" y1="295" x2="534" y2="295" stroke="#ff9f43" stroke-width="3" marker-end="url(#arr)"/></g>' +
'<g class="sarrow" data-steps="7" style="display:none"><line x1="534" y1="325" x2="200" y2="325" stroke="#2ed573" stroke-width="3" marker-end="url(#arrg)"/></g>' +
'</svg>';

  NS.buildDiagram = function (container) {
    container.innerHTML = SVG;
    return container.querySelector('svg');
  };
})();
