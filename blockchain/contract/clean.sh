
BUFFER=`docker ps -a | grep "nodeos"` 
if [[ ! -z "$BUFFER" ]]
then
    echo "Stop Docker Instance"
else 
    sudo rm -rf /tmp/eosio
fi


