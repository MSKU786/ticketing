We can't directly use ticket.dev from client to use auth service because they are inside same cluster.

We have to use ingnix for this so currently auth service and client is in default namespace

\*\* Command for listing out default services
PS D:\ticketing> kubectl get services
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
auth-mongo-srv ClusterIP 10.105.108.205 <none> 27017/TCP 2d8h
auth-srv ClusterIP 10.107.89.119 <none> 4000/TCP 2d8h
client-srv ClusterIP 10.109.68.205 <none> 3000/TCP 2d8h
kubernetes ClusterIP 10.96.0.1 <none> 443/TCP 37d

\*\* Command for listing out all the namespaces
PS D:\ticketing> kubectl get ns
NAME STATUS AGE
default Active 37d
ingress-nginx Active 30d
kube-node-lease Active 37d
kube-public Active 37d
kube-system Active 37d

\*\* Command for listing our ingress-nginx services
PS D:\ticketing> kubectl get services -n ingress-nginx
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
ingress-nginx-controller LoadBalancer 10.109.234.31 localhost 80:31644/TCP,443:31574/TCP 30d
ingress-nginx-controller-admission ClusterIP 10.97.222.68 <none> 443/TCP 30d

The url for accessing ingress from client so basically what are we doing is routing our req through the inginx we already have setup to figure out which route point to which service

so the url will be http://{{service-name}}.{{namespace}}.svc.cluster.local

\*\* Note: We need to do this because we are trying to fetch the data during server side rendering inside getInitialPropsFunction

//

docker build -t manish332000/ticketing_ticket .

\*\* How to INstall Ingress-nginx \*\*
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

// 2 June 2024

Finally moved local docker over to google cloud
gcloud sdk
