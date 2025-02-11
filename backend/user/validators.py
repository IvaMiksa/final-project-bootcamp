import re

from django.core.exceptions import ValidationError


def validate_password_strength(password):
    reg = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$"
    pat = re.compile(reg)

    if not re.search(pat, password):
        raise ValidationError({
            'new_password': (
                "Password must contain at least one uppercase letter,\n"
                "one lowercase letter,\n"
                "one digit,\n"
                "one special character,\n"
                "and be between 8 to 20 characters long."
            ).replace('\n', ' ')
        })
