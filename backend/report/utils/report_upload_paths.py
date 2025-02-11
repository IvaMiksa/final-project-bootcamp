import uuid


def reports_image_path(instance, filename):
    return f"reports/{instance.property.id}/{uuid.uuid4()}/{filename}"
