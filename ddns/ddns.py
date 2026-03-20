import requests
import boto3
import os

HOSTED_ZONE_ID = os.getenv("HOSTED_ZONE_ID")
RECORD_NAME = os.getenv("RECORD_NAME")
TTL = 300

def get_public_ip():
    return requests.get("https://api.ipify.org").text.strip()

def get_route53_ip(client):
    response = client.list_resource_record_sets(
        HostedZoneId=HOSTED_ZONE_ID,
        StartRecordName=RECORD_NAME,
        StartRecordType='A',
        MaxItems='1'
    )

    record_sets = response['ResourceRecordSets']
    if record_sets and record_sets[0]['Name'].startswith(RECORD_NAME):
        return record_sets[0]['ResourceRecords'][0]['Value']
    return None

def update_route53(client, new_ip):
    print(f"Updating IP to {new_ip}")

    client.change_resource_record_sets(
        HostedZoneId=HOSTED_ZONE_ID,
        ChangeBatch={
            'Comment': 'Auto-updated dynamic IP',
            'Changes': [
                {
                    'Action': 'UPSERT',
                    'ResourceRecordSet': {
                        'Name': RECORD_NAME,
                        'Type': 'A',
                        'TTL': TTL,
                        'ResourceRecords': [{'Value': new_ip}]
                    }
                }
            ]
        }
    )

def main():
    client = boto3.client("route53")

    current_ip = get_public_ip()
    route53_ip = get_route53_ip(client)

    print(f"Current IP: {current_ip}")
    print(f"Route53 IP: {route53_ip}")

    if current_ip != route53_ip:
        update_route53(client, current_ip)
    else:
        print("IP unchanged")

if __name__ == "__main__":
    main()
