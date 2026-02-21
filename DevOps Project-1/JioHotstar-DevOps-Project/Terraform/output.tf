output "cluster_id" {
  value = aws_eks_cluster.JioHotstar.id
}

output "node_group_id" {
  value = aws_eks_node_group.JioHotstar.id
}

output "vpc_id" {
  value = aws_vpc.Jio_vpc.id
}

output "subnet_ids" {
  value = aws_subnet.Jio_subnet[*].id
}