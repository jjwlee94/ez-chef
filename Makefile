build:
	cd frontend && ${MAKE} build
	cd backend && ${MAKE} build

run:
	docker-compose up