/* steps.js – learning-step content, legend and glossary */
(function () {
  'use strict';
  var NS = (window.EC2V = window.EC2V || {});

  NS.STEPS = [
    {
      id: 1,
      title: 'Pick an AMI & Instance Type',
      subtitle: 'Choose the computer you rent',
      panelTitle: 'Launch settings',
      lines: [
        'AMI: Amazon Linux 2023',
        'Type: t3.micro (2 vCPU, 1 GiB RAM)',
        'Storage: 8 GiB gp3 EBS volume',
        'Apache httpd: not installed yet'
      ],
      plain: "Ravi wants a shop window on the internet, so he rents a computer from Amazon. First he picks a ready-made starter kit (the AMI, like a photocopy of a computer with the operating system already set up) and the size of the machine (the instance type, like choosing a small, medium or large computer).",
      tech: "An AMI (Amazon Machine Image) is the template used to boot an EC2 instance: it holds the operating system and any preinstalled software. Amazon Linux 2023 is a common choice. The instance type sets CPU and memory (t3.micro = 2 vCPU, 1 GiB RAM; check your account's free-tier terms). The root volume is an EBS disk, here 8 GiB of gp3.",
      watch: "Three cards on the left (AMI, instance type, storage) feed into the dashed EC2 box. Dashed means 'not launched yet'."
    },
    {
      id: 2,
      title: 'Network & Key Pair',
      subtitle: 'Where it lives and how you log in',
      panelTitle: 'Network settings',
      lines: [
        'VPC:    10.0.0.0/16',
        'Subnet: public 10.0.1.0/24',
        'Auto-assign public IP: Enabled',
        'Key pair: my-key.pem (RSA)',
        'Public IP: 203.0.113.25'
      ],
      plain: "The computer needs a home. Ravi puts it in the public section of his fenced campus (the VPC), right next to the main entrance (the Internet Gateway) so visitors can reach it. He also gets a house key (the key pair): only the person holding the key file can log in. The public IP is the street address of the computer.",
      tech: "The instance is launched into a public subnet (10.0.1.0/24) of a VPC (10.0.0.0/16) whose route table sends 0.0.0.0/0 to an Internet Gateway. Auto-assign public IPv4 gives it an internet-reachable address (or attach an Elastic IP for a fixed one; public IPv4 addresses are billed by AWS). The key pair's public key is stored on the instance, you download the private .pem file once and keep it safe.",
      watch: "The Region, VPC and subnet boundaries appear. Your laptop gets a 🔑 key file and the subnet shows the public IP tag."
    },
    {
      id: 3,
      title: 'Security Group',
      subtitle: 'The door guard',
      panelTitle: 'Firewall rules',
      lines: [
        'Inbound rules:',
        '  SSH   TCP 22  <- My IP only',
        '  HTTP  TCP 80  <- 0.0.0.0/0',
        'Outbound: all traffic (default)',
        'Everything else is blocked.'
      ],
      plain: "A door guard stands in front of the computer with a list. The 'remote login' door (port 22) only opens for Ravi's own laptop. The 'web page' door (port 80) opens for everyone, because customers must be able to visit. Every other door stays locked.",
      tech: "A security group is a stateful virtual firewall attached to the instance's network interface. Inbound: SSH (TCP 22) from your own IP as a /32, HTTP (TCP 80) from 0.0.0.0/0. By default all inbound traffic is denied and all outbound is allowed. Stateful means reply traffic for an allowed request is automatically allowed back out.",
      watch: "A purple dashed fence appears around the instance with two rule badges at the bottom: SSH for you only, HTTP for everyone."
    },
    {
      id: 4,
      title: 'Launch & Wait for Running',
      subtitle: 'Switch the computer on',
      panelTitle: 'Instance details',
      lines: [
        'Instance state: running',
        'Status checks: 2/2 passed',
        'Private IP: 10.0.1.25',
        'Public IP:  203.0.113.25',
        'Next: log in and install Apache'
      ],
      plain: "Ravi presses the Launch button. Amazon prepares the computer, which takes a minute or two. When the status says running and its health checks pass, the computer is switched on and ready to be used.",
      tech: "The instance moves from pending to running. Two status checks (system status and instance status) should reach 2/2 passed. The instance now has a private IP (10.0.1.25) from the subnet range and a public IP (203.0.113.25, a documentation example address).",
      watch: "The dashed border turns solid orange and the status changes from 'not launched' to a green 'running'."
    },
    {
      id: 5,
      title: 'Connect with SSH',
      subtitle: 'Log in remotely with your key',
      panelTitle: 'ec2-user@ip-10-0-1-25',
      lines: [
        '# on your laptop',
        '$ chmod 400 my-key.pem',
        '$ ssh -i my-key.pem ec2-user@203.0.113.25',
        '[ec2-user@ip-10-0-1-25 ~]$'
      ],
      plain: "Ravi 'phones' the computer from his laptop using a secret-key handshake called SSH. Now he can type commands as if he were sitting in front of it, even though it sits in Amazon's building.",
      tech: "SSH uses TCP port 22 and key-based authentication. Run chmod 400 on the .pem file (SSH refuses keys that others can read), then ssh -i my-key.pem ec2-user@<public-ip>. ec2-user is the default user on Amazon Linux (ubuntu on Ubuntu AMIs). Traffic enters via the Internet Gateway and is accepted because the security group allows port 22 from your IP.",
      watch: "The 🔑 packet travels from the laptop through the Internet and the gate into the instance. The terminal shows the login commands."
    },
    {
      id: 6,
      title: 'Install & Start Apache',
      subtitle: 'Hire the shopkeeper',
      panelTitle: 'ec2-user@ip-10-0-1-25',
      lines: [
        '$ sudo dnf install -y httpd',
        'Complete!',
        '$ sudo systemctl enable --now httpd',
        '$ systemctl status httpd',
        'Active: active (running)'
      ],
      plain: "Inside the computer Ravi installs Apache, a shopkeeper program whose only job is handing out web pages to visitors. He downloads it from the 'app store' (a package repository) and tells the computer to start it now and every time it turns on.",
      tech: "On Amazon Linux 2023, sudo dnf install -y httpd installs the Apache HTTP Server package (use yum on Amazon Linux 2, apt on Ubuntu where the package is apache2). systemctl enable --now httpd starts the service immediately and on every boot. Apache listens on port 80. Downloading packages needs outbound internet access, which this public instance has through the Internet Gateway.",
      watch: "A 📦 package flows in from the Internet. The terminal shows 'active (running)' and an Apache :80 badge appears on the instance."
    },
    {
      id: 7,
      title: 'Visit the Website',
      subtitle: 'See Hello from Apache',
      panelTitle: 'ec2-user@ip-10-0-1-25',
      lines: [
        "$ echo '<h1>Hello from Apache!</h1>' \\",
        '   | sudo tee /var/www/html/index.html',
        '$ curl -I localhost',
        'HTTP/1.1 200 OK',
        '# then open http://203.0.113.25'
      ],
      plain: "Ravi writes a Hello page and puts it on the shelf where Apache looks. Then he types the computer's address into any browser. The request walks in through the main entrance, the shopkeeper finds the page and sends it back, and the browser shows it.",
      tech: "Apache's default document root is /var/www/html. The browser sends an HTTP GET to http://<public-ip>:80, the security group allows port 80, and Apache returns 200 OK with index.html. Return traffic is allowed automatically because security groups are stateful. If the page times out, check the security group rule, the public IP and the subnet's route to the Internet Gateway. Use http:// unless you configure TLS for https.",
      watch: "✉️ goes in along the top wire and 📄 comes back along the bottom wire. The laptop screen now shows 'Hello from Apache!'."
    }
  ];

  NS.PACKETS = [
    { icon: '🔑', name: 'SSH login', desc: 'Remote login with your key (step 5)' },
    { icon: '📦', name: 'Apache package', desc: 'Software downloaded to the server (step 6)' },
    { icon: '✉️', name: 'Browser request', desc: 'HTTP request from a visitor (step 7)' },
    { icon: '📄', name: 'Web page response', desc: 'HTTP 200 reply with the page (step 7)' }
  ];

  NS.GLOSSARY = [
    { term: 'AWS Region', def: 'A geographic area where AWS runs data centers, such as Mumbai (ap-south-1).', analogy: 'A city.', role: 'Decides where your server physically lives.' },
    { term: 'VPC', def: 'Virtual Private Cloud: your own isolated network inside AWS with an IP range such as 10.0.0.0/16.', analogy: "A fenced private campus.", role: 'Holds the subnet and the EC2 instance.' },
    { term: 'Subnet', def: 'A slice of the VPC IP range inside one Availability Zone. Public subnets route to an Internet Gateway.', analogy: 'A department or section of the campus.', role: 'The EC2 instance sits in a public subnet (10.0.1.0/24).' },
    { term: 'Internet Gateway (IGW)', def: 'A VPC component that connects the VPC to the internet.', analogy: 'The main entrance gate.', role: 'Lets visitors and SSH traffic reach the instance.' },
    { term: 'EC2', def: 'Elastic Compute Cloud: virtual servers you rent by the second.', analogy: 'A computer you rent from Amazon.', role: 'Runs the Apache web server.' },
    { term: 'AMI', def: 'Amazon Machine Image: a template with the operating system and software used to start an instance.', analogy: 'A ready-made starter kit or computer photocopy.', role: 'Amazon Linux 2023 is the AMI used here.' },
    { term: 'Instance type', def: 'The hardware size of an EC2 instance (vCPU, memory, network). Example: t3.micro.', analogy: 'Small, medium or large computer.', role: 'Chooses how powerful the web server is.' },
    { term: 'EBS volume', def: 'Elastic Block Store: network-attached disk storage for EC2.', analogy: "The computer's hard disk.", role: 'Stores the OS, Apache and your web files.' },
    { term: 'Key pair', def: 'A public/private key set used to prove who you are when logging in over SSH.', analogy: 'A house key that only you hold.', role: 'Lets only you log in to the instance.' },
    { term: 'Public IP', def: 'An internet-reachable IPv4 address assigned to the instance.', analogy: 'The computer’s street address.', role: 'Visitors type it into the browser to find the site.' },
    { term: 'Security group', def: 'A stateful firewall that allows or denies traffic to an instance by protocol, port and source.', analogy: 'A door guard with a guest list.', role: 'Opens port 22 for you and port 80 for everyone.' },
    { term: 'Port', def: 'A numbered channel on a computer. SSH uses 22, HTTP uses 80, HTTPS uses 443.', analogy: 'A numbered door on the building.', role: 'Port 80 serves the web page; port 22 serves admin logins.' },
    { term: 'SSH', def: 'Secure Shell: an encrypted way to control a remote computer through a terminal.', analogy: 'A private encrypted phone call to the server.', role: 'How you install and configure Apache.' },
    { term: 'Apache httpd', def: 'The Apache HTTP Server: free software that answers HTTP requests and serves web pages.', analogy: 'The shopkeeper handing out pages.', role: 'The actual web server you install on EC2.' },
    { term: 'dnf / yum', def: 'Package managers on Amazon Linux that download and install software.', analogy: 'An app store for the server.', role: 'sudo dnf install -y httpd installs Apache.' },
    { term: 'systemd / systemctl', def: 'The service manager on Linux. systemctl starts, stops and enables services.', analogy: 'The building manager who starts staff at opening time.', role: 'Keeps Apache running and starts it on boot.' },
    { term: 'HTTP', def: 'HyperText Transfer Protocol: how browsers ask for web pages and servers reply.', analogy: 'The language of ordering and delivering pages.', role: 'The ✉️ request and 📄 response in step 7.' },
    { term: 'Document root', def: 'The folder Apache serves files from. On Amazon Linux it is /var/www/html.', analogy: 'The shelf where the shopkeeper keeps pages.', role: 'index.html placed here becomes your home page.' }
  ];
})();
