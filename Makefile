build:
	cd frontend && ${MAKE} build
	cd backend && ${MAKE} build
	kind create cluster
	kubectl apply -f backend-deployment.yaml
	kubectl apply -f frontend-deployment.yaml
	kubectl wait --for=condition=available --timeout=1000s --all deployments
	kubectl port-forward deployment/ez-chef-react-app-1 3000:3000 &
	kubectl port-forward deployment/ez-chef-api-server-1 8000:8000

run:
	docker-compose up

push:
	docker push jjwlee94/api-server
	docker push jjwlee94/react-app