import requests
import boto3
from .settings import settings

print("Using Hosted Zone ID:", settings.HOSTED_ZONE_ID)
print("Using Record Name:", settings.RECORD_NAME)
print("Using TTL:", settings.TTL)

def get_public_ip():
    return requests.get("https://api.ipify.org").text.strip()

def main():
    client = boto3.client("route53")

    ip = get_public_ip()
    print("Current public IP:", ip)

    response = client.change_resource_record_sets(
        HostedZoneId=HOSTED_ZONE_ID,
        ChangeBatch={
            'Comment': 'Manual test update',
            'Changes': [
                {
                    'Action': 'UPSERT',
                    'ResourceRecordSet': {
                        'Name': RECORD_NAME,
                        'Type': 'A',
                        'TTL': 300,
                        'ResourceRecords': [{'Value': ip}]
                    }
                }
            ]
        }
    )

    print("Route53 updated:", response)

if __name__ == "__main__":
    main()
