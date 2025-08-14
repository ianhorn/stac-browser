npm start -- --open --catalogUrl="https://spved5ihrl.execute-api.us-west-2.amazonaws.com/"

npm run build -- --catalogUrl="https://spved5ihrl.execute-api.us-west-2.amazonaws.com/" \
--catalogTitle="Kentucky From Above SpatioTemporal Asset Catalog" \
--pathPrefix="" \
--historyMode:"hash"


npm run build -- \
--catalogUrl="https://spved5ihrl.execute-api.us-west-2.amazonaws.com/" \
--catalogTitle="Kentucky From Above SpatioTemporal Asset Catalog" \
--pathPrefix="/browser/"

docker run -p 8080:8080 -d --name stac-browser --restart=always \
-e SB_catalogUrl="http://ec2-52-88-114-187.us-west-2.compute.amazonaws.com" \
-e SB_catalogTitle="Kentucky From Above SpatioTemporal Asset Catalog" \
-e SB_pathPrefix="/browser" \
stac-browser:v1 
