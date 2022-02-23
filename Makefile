build:
	cd frontend && ${MAKE} build
	cd backend && ${MAKE} build
	kind create cluster
	kubectl apply -f backend-deployment.yaml
	kubectl apply -f frontend-deployment.yaml

run:
	docker-compose up

push:
	docker push jjwlee94/api-server
	docker push jjwlee94/react-app