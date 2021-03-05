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
