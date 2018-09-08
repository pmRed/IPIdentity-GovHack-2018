
BUFFER=`docker ps -a | grep "eosio"` 
if [[ ! -z "$BUFFER" ]]
then
    echo "Stop Docker Instance"
else 
    sudo rm -rf /tmp/eosio
fi


