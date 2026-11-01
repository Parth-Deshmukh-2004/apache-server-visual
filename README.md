# EC2 Apache Visualizer

An interactive, animated, beginner-friendly website that explains **how to launch an Apache web server on an Amazon EC2 instance**, step by step. It uses the same story-driven style as the AWS 3-Tier Visualizer: Ravi rents a computer from Amazon, locks the doors, logs in, installs Apache and visits his first web page.

Built with only HTML5, CSS3, vanilla JavaScript and inline SVG. No frameworks, npm, build tools or backend.

## Features

- 7 learning steps with progressive reveal (clicking an earlier step returns the diagram to its earlier state)
- One animated inline SVG diagram (`viewBox="0 0 1200 640"`, dark navy, dot grid)
- Moving packets using `animateMotion` + `mpath`: 🔑 SSH, 📦 package, ✉️ request, 📄 response
- Auto-play (one step every 5 seconds), Pause, Reset, progress indicator (e.g. 4/7)
- Beginner / Technical explanation mode
- Light and dark page themes (the diagram always stays dark navy)
- Architecture summary and searchable glossary (definition, analogy, role)
- Keyboard accessible: focus outlines, ← / → keys change steps
- Respects `prefers-reduced-motion` (packets are replaced by static arrows)

## The architecture

```
Your laptop → Internet → Internet Gateway → [ VPC 10.0.0.0/16
                                               └ Public subnet 10.0.1.0/24
                                                  └ Security Group (22, 80)
                                                     └ EC2 instance running Apache ]
```

## The seven steps

| # | Step | Analogy |
|---|------|---------|
| 1 | Pick an AMI & instance type | Choose the computer you rent |
| 2 | Network & key pair | Choose the building section and get a house key |
| 3 | Security group | A door guard with a guest list |
| 4 | Launch & wait for running | Switch the computer on |
| 5 | Connect with SSH | Phone the computer with a secret handshake |
| 6 | Install & start Apache | Hire a shopkeeper |
| 7 | Visit the website | A customer walks in and gets a page |

## AWS services and analogies

- Region = city, VPC = fenced campus, Subnet = department, Internet Gateway = main entrance
- EC2 = rented computer, AMI = starter kit, EBS = hard disk, Key pair = house key
- Security group = door guard, Public IP = street address, Apache = shopkeeper

## Command cheat sheet (Amazon Linux 2023)

```bash
chmod 400 my-key.pem
ssh -i my-key.pem ec2-user@<public-ip>
sudo dnf install -y httpd
sudo systemctl enable --now httpd
echo '<h1>Hello from Apache!</h1>' | sudo tee /var/www/html/index.html
```

Then open `http://<public-ip>` in a browser (use `http://`, not `https://`).

Troubleshooting: if the page times out, check that the security group allows TCP 80, that the instance has a public IP, and that the subnet's route table sends `0.0.0.0/0` to an Internet Gateway. Stop or terminate the instance when you finish to avoid charges.

## Folder structure

```text
ec2-apache-visualizer/
├── index.html
├── css/style.css
├── js/
│   ├── app.js            UI wiring (steps, controls, theme, glossary)
│   ├── architecture.js   the inline SVG diagram
│   ├── animations.js     step visibility, terminal text, packets
│   └── steps.js          step text, legend, glossary data
├── assets/favicon.svg
├── .nojekyll
├── LICENSE
└── README.md
```

## Run locally

```bash
python3 -m http.server 8000
```

Open http://localhost:8000

## Deploy to GitHub Pages

Settings → Pages → Deploy from a branch → main → / (root) → Save.

## Customise

- Edit step text, terminal lines, legend and glossary in `js/steps.js`
- Edit the diagram in `js/architecture.js` (elements with `data-from` / `data-until` appear on those steps; packets use `data-steps`)
- Change colours and layout in `css/style.css`

IP addresses used (203.0.113.25) are documentation examples.

## License

MIT, see `LICENSE`.
