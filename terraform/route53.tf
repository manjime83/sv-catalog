data "aws_route53_zone" "zone" {
  name = var.hosted_zone_name
}

resource "aws_route53_record" "record" {
  zone_id = data.aws_route53_zone.zone.zone_id
  name    = "${var.project_name}.${data.aws_route53_zone.zone.name}"
  type    = "CNAME"
  ttl     = "300"
  records = ["${var.project_name}.netlify.app"]
}
