contract = "hello"
account = "thaum"

build:
	./build.sh ${contract}

clean:
	rm -rf build
	rm -rf dataStore
	docker stop nodeos
	./clean.sh

deploy:
	./deploy.sh ${account} ${contract}

accounts:
	./accounts.sh
	rm -rf dataStoreBUF


.PHONY: build clean deploy
