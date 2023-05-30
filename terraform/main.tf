terraform {
  backend "pg" {}
}

provider "aws" {
  default_tags {
    tags = {
      Project     = "sv-catalog"
      Environment = "production"
    }
  }
}

data "aws_route53_zone" "zone" {
  name = var.hosted_zone_name
}

resource "aws_route53_record" "record" {
  zone_id = data.aws_route53_zone.zone.zone_id
  name    = "sv.${data.aws_route53_zone.zone.name}"
  type    = "CNAME"
  ttl     = "300"
  records = ["sv-catalog.netlify.app"]
}
