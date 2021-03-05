# Docker Formation

## What is Docker ?

Docker is an open source tool developed in Go and created in 2012 by 3 french engineers

A good first definition of Docker is : "A tool used to package an app and its dependencies in an isolated container that can be executed in each environment"

## How docker works ?

Docker can be executed only in a linux environment. For people working on OSX or Windows we must use docker via a virtual machine.
When executing docker on OSX or Windows it will use an hypervisor (Hyper-V for Windows and xhyve for OSX) that will emulate a VM with Linux kernel.

With the linux kernel we can use the docker deamon that will allow us to execute containers.

##### VM vs Docker

A VM is a software machine that is executed on an host machine (a server or a computer). It takes a art of the hardware ressources and use it to run. The principal disadvantage is the loss of ressources because the same quantity of hardware ressources are now use to run more processes.

![](ressources/vm-schema.png)

Docker is very different because it use the linux kernel and it share it to every containers. It means that each container does not have the entire OS (that is a heavy program).

![](ressources/docker-schema.png)

##### Why Docker is only executable on linux ?

Docker is an API that allow use to use the low level featurs of linux easily.

###### Les namespaces

namespaces are a linux feature allowing the creation of isolated spaces on a Linux OS. It is this feature of Linux that gives containers their isolation.

###### Cgroups

Cgroups for "control groups" allows to limit the access to ressources to processes. thanks to this Docker can distribute the different ressources (CPU,GPU,RAM,bandwidth,write and read hard disk) between the different processes.
It is also possible to limit the allowed ressources for each container.

###### UnionFS

UnionFs for (Union File Systeme) is a type of filesystem for linux.
Depending on the Linux distribution, Docker uses one of the available implementations.
These file systems work by creating layers. They are at the heart of Docker images and allow them to be light and very fast.

## Docker Ecosystem

### Docker Engine

##### Docker deamon

The main piece of docker is the docker deamon (dockerd). The docker deamon is the process that will create all the Docker objects (images, containers, volumes... ). The dockerd is blocked and we cannot communicate directy with it.

the Docker Engine is built on the client/server pattern. It is composed of three parts.
![](ressources/Docker-engine.png)

###### Docker Client

The docker client is a CLI (command line interface). The CLI translate commands entered by the developer in request for the API

###### Docker server

The docker server is the docker deamon and the API that allow us to communicate with it.

### Docker Objects

###### Images

a Docker image is a readonly schema that contains all the informations to create a Docker container.
To create a Docker image we must use a specific file called Dockerfile (with a specific syntax) used to define the steps necessary to create the image. Most often, an image is itself based on another image

###### Container

a container is a instance of an image running and that can take configuration options set at the launch.We can create as much container as we want from an image. To create, start, stop, move or delete a container, you have to use the CLI.
By default, a container is isolated from other containers and from the host machine. It is of course possible to configure this isolation by modifying the networks to which the container is connected, the storage etc.

###### Volumes

Volumes allow containers to store data. They are initialized when creating a container. They are used to persist and share data from a container.
These volumes are stored outside of the UnionFS system that we have seen. They allow data to be preserved even if a container is deleted, updated or reloaded.

### Scale with Docker

##### Multi-containers app

###### Docker Compose

Docker Compose is the Docker tool for defining and launching multi-container applications. With Docker COmpose we will be able to create a container per service (DB, Auth, API...) and launch all the services of the app with an only command.

##### Multi-host app

Use an orchestrator for multi-host with Docker swarm or Kubernetes

###### Docker Swarm

Docker swarm is the Docker tool to manage multi-host application. It use the same config file that Docker compose but different commands.

###### Kubernets

Kubernets is a tool to manage multi multi-host application developed by Facebook. It allows you to do a lot more things than Docker Swarm but takes a lot longer to learn.

## First Container

#### First run

Docker has an example container that allows you to see how launching a container works.
this image is called `hello-world`

When running `docker run hello-world` we ask the docker deamon (via the docker client) to run a new container from specified image.

In a first time, dockerd will search if the image is locally unable. Because it is the first time that we try to use this image, it was not yet downloaded from the **docker hub** docker indicates that it cannot find the image on your machine :

```bash
Unable to find image 'hello-world:latest' locally
```

The `:latest` is the tag of the image, its version. By default if we don't provide a tag, docker will search on the registry (Docker Hub) the latest version.

`latest: Pulling from library/hello-world`

Docker will then retrieve the image from the configured registry (which is Docker Hub by default). It actually runs `docker pull hello-world`

```bash
0e03bdcc26d7: Pull complete
Digest: sha256:7e02330c713f93b1d3e4c5003350d0dbe215ca269dd1d84a4abc577908344b30
Status: Downloaded newer image for hello-world:latest
```

Docker indicates that the download (pull) is completed. It provides the **digest** of the image that is its unique id (this is actually a SHA256 hash of the image's JSON configuration).

The rest of the message is displayed by the container. To display the message, the docker deamon created a new container based on on the hello-world image.

```bash
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

#### Rerun

If we rerun the image, all the download phase disparaître

```bash
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

Indeed the image has already been pull. we can verify if an image is already available locally with the following command `docker images`

```bash
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    bf756fb1ae65   14 months ago   13.3kB
```

we can also list the different containers usig `docker container ls -a`

```bash
CONTAINER ID   IMAGE         COMMAND    CREATED         STATUS                     PORTS     NAMES
ed74998d24d8   hello-world   "/hello"   4 minutes ago   Exited (0) 4 minutes ago             admiring_lewin
c091bf98a2af   hello-world   "/hello"   2 hours ago     Exited (0) 2 hours ago               strange_chatelet
78983cf4b0a2   hello-world   "/hello"   2 hours ago     Exited (0) 2 hours ago               lucid_gates
```

we can see that each run of the hello-world image create a new container.
