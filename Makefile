build:
	cd frontend && ${MAKE} build
	cd backend && ${MAKE} build
	kind create cluster
	kubectl apply -f backend-deployment.yaml
	kubectl apply -f frontend-deployment.yaml
	kubectl wait --for=condition=complete -n d1 job/test-job1

run:
	docker-compose up

push:
	docker push jjwlee94/api-server
	docker push jjwlee94/react-app