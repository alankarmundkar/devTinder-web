# Dev Tinder

- Create vite + react application
- Install tailwindcss and daisy ui
- Add Navbar


Body 
  NavBar
  Route /  => Feed
  Route /login => Login
  Route /connection => connection
  Route / 

- whenever you are making api call passs  { withCredentials: true } in axios


# Deployment
- Signup Aws
- Launch Instance
- Modify permission:  chmod 400 "devTinder-secret.pem
- Connect to machine using command ssh -i "devTinder-secret.pem" ubuntu@ec2-13-60-46-230.eu-north-1.compute.amazonaws.com
- install node
- Frontend
- npm install - it install dependenceis install
- sudo apt update - it updates the system packages
- sudo apt install nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- copy code from dist(build files) to /var/www/html/dist 
- sudo scp -r dist/* /var/www/html
- enable port 80 : nginx is webserver and deployed at 80


- ssh -i "devTinder-secret.pem" ubuntu@ec2-13-60-46-230.eu-north-1.compute.amazonaws.com
- sudo apt udpate
- sudo apt install nginx
- sudo apt systemctl start nginx
- sudo apt systemctl enable nginx
- sudo scp -r dist/* /var/www/html/


# Backend Deployment
- npm install pm2 -g
- pm2 start npm --start
- pm2 logs

- to clear the logs
-pm2 flush <nameoftheprocess>

pm2 list
pm2 stop npm    npm: name of the process
pm2 delette npm 

- pm2 start npm --name <nameoftheprocess> -- start 
 pm2 start npm --name  "devtinder-backend" -- start

# nginx configuration

sudo nano /etc/nginx/sites-available/default

 config 

          server_name 51.21.197.169;

    location /api/ {
        proxy_pass http://localhost:7777/;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }


-restart nginx

systemctl restart nginx
