output "name" {
  value = data.aws_route53_zone.zone.id
}

output "record" {
  value = resource.aws_route53_record.record.name
}
