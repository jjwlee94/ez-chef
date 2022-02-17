build:
	cd frontend && ${MAKE} build
	cd backend && ${MAKE} build

run:
	docker-compose up

push:
	docker push jjwlee94/api-server
	docker push jjwlee94/react-app