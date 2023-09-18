from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate


UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['email', 'username', 'password', 'details', 'is_admin']  # Include the 'is_admin' field
    def create(self, validated_data):
        # Extract the 'details' field and 'is_admin' field from validated data
        details = validated_data.pop('details', None)
        is_admin = validated_data.pop('is_admin', False)
        # Create the user object without 'details' and 'is_admin' fields
        user = UserModel.objects.create_user(**validated_data)
        # Assign the 'details' field if provided
        if details:
            user.details = details
            user.save()
        # Assign the 'is_admin' field
        user.is_admin = is_admin
        user.save()

        return user


class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
