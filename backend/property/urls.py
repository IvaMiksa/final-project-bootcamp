from django.urls import path

from property.views import RetrieveCreatePropertyView, PropertyDetailView, AmenityListView, ListReviewsView, \
    CreateReviewView, ListUpdateDeleteReviewView, ListCommentsView, CreateCommentView, ListUpdateDeleteCommentView, \
    GenerateContractPdf, ListNomadReviews, ListUsersPropertiesView, FavouritePropertyToggleView, \
    RetrieveUsersFavouritePropertiesView

urlpatterns = [
    path("", RetrieveCreatePropertyView.as_view()),
    path("add-favourite/<uuid:property_id>/", FavouritePropertyToggleView.as_view()),
    path("favourites/", RetrieveUsersFavouritePropertiesView.as_view()),
    path("me/", ListUsersPropertiesView.as_view()),
    path("<uuid:property_id>/", PropertyDetailView.as_view()),
    path("amenities/", AmenityListView.as_view()),
    path("generate-pdf/<uuid:property_id>/", GenerateContractPdf.as_view()),
    path("amenities/", AmenityListView.as_view()),
    path("reviews/", ListReviewsView.as_view()),
    path("create-review/<uuid:property_id>/", CreateReviewView.as_view()),
    path("review/<uuid:review_id>/", ListUpdateDeleteReviewView.as_view()),
    path("review/comments/", ListCommentsView.as_view()),
    path("review/create-comment/<uuid:review_id>/", CreateCommentView.as_view()),
    path("review/comment/<uuid:comment_id>/", ListUpdateDeleteCommentView.as_view()),
    path("reviews/me/", ListNomadReviews.as_view())
]
