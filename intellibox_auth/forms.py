from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django import forms


class RegisterForm(UserCreationForm):

    password1 = forms.CharField(
        label='Password',
        max_length=200, 
        widget=forms.PasswordInput(attrs={'class': 'form-control'})
    ) 
    password2 = forms.CharField(
        label='Password confirmation', 
        max_length=200, 
        widget=forms.PasswordInput(attrs={'class': 'form-control'})
    ) 

    class Meta:
        model = get_user_model()
        fields = 'username', 'email', 'pin'

        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
            'pin': forms.PasswordInput(attrs={'class': 'form-control'})
        }