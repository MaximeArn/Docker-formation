- pull mongo official image `docker pull mongo`
- start the container `docker run --name database -d mongo`
- connects to te container `docker exec -it database sh`
- start mongo `mongo`

# Persist Data

- start the container with a volume `docker run --name database -d --mount type=volume,source=db-backup,target=/data/db mongo`
