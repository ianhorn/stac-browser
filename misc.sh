npm start -- --open --catalogUrl="http://localhost:8082"

npm run build -- --catalogUrl="http://ec2-52-88-114-187.us-west-2.compute.amazonaws.com:8082/" \
--historyMode=hash \
--catalogTitle="KyFromAbove Stac-Browser" 

npm run build -- \
--catalogUrl="http://localhost:8082/" \
--catalogTitle="KyFromAbove Stac-Browser" \
--pathPrefix="/browser/"

docker run -p 8080:8080 -d --name stac-browser --restart=always \
-e SB_catalogUrl="http://ec2-52-88-114-187.us-west-2.compute.amazonaws.com" \
-e SB_catalogTitle="KyFromAbove Stac-Browser" \
-e SB_pathPrefix="/browser" \
stac-browser:v1 



# Copy browser static site to nginx
docker cp ./dist nginx:/usr/share/nginx/html/browser



server {
    listen 8082;

    location / {
        proxy_pass http://app:8082;

        # Basic proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # CORS headers
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
        add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type, Accept, Origin' always;

        # Preflight (OPTIONS) handling
        if ($request_method = OPTIONS ) {
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
            return 204;
        }
    }
}

server {
    listen 80;

    location = /dev {
        return 301 /dev/$is_args$args;
    }

    location /browser/ {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /browser/index.html;
    }
}