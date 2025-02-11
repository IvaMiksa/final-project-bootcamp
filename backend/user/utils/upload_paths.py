import uuid


def avatar_image_path(instance, filename):
    return f"avatars/{instance.email}/{uuid.uuid4()}/{filename}"


def passport_image_path(instance, filename):
    return f"passports/{instance.email}/{uuid.uuid4()}/{filename}"


def proof_of_work_file_path(instance, filename):
    return f"proofs/{instance.user.email}/{uuid.uuid4()}/{filename}"


def visas_image_path(instance, filename):
    return f"visas/{instance.user.email}/{uuid.uuid4()}/{filename}"


def proof_of_ownership_file_path(instance, filename):
    return f"ownerships/{instance.user.email}/{uuid.uuid4()}/{filename}"
