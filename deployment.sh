export AWS_ACCOUNT=972073858291
export AWS_REGION=us-east-2
export DOMAIN_NAME="flip.mauridev.net"
export CERTIFICATE="arn:aws:acm:us-east-1:972073858291:certificate/bd42599e-4ab5-4ccd-9ec9-5b7f08f6ed33"
export HOSTED_ZONE_ID="/hostedzone/Z1IUAUSKRI6O7T"

if [ $1 = "-c" ] || [ $1 = "--create" ]
then

aws cloudformation create-stack \
  	--stack-name myteststack \
	--template-body file://template.json \
	--parameters \
		ParameterKey=S3Bucket,ParameterValue=$DOMAIN_NAME \
		ParameterKey=DomainName,ParameterValue=$DOMAIN_NAME \
		ParameterKey=Certificate,ParameterValue=$CERTIFICATE \
		ParameterKey=HostedZoneId,ParameterValue=$HOSTED_ZONE_ID


fi

if [ $1 = "-d" ] || [ $1 = "--delete" ]
then
  	aws cloudformation delete-stack --stack-name flip
fi