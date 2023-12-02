How to create secret keys locally

This is command
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<<key>>

HOw to check

kubectl get secrets
