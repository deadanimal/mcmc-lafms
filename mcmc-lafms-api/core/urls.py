from documents.views import (
    DocumentsViewSet
)
from receipts.views import (
    ReceiptsViewSet
)
from notifications.views import (
    NotificationsViewSet
)
# from api_basic.views import (
#     ApiBasicViewSet
# )
from organisations.views import (
    OrganisationViewSet
)
# Users app
from users.views import (
    CustomUserViewSet
)
from datetime import datetime, timedelta

from django.conf import settings
from django.conf.urls import include, url
from django.contrib.gis import admin

from rest_framework import routers
from rest_framework_extensions.routers import NestedRouterMixin

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from users.views import (
    MyTokenObtainPairView
)


class NestedDefaultRouter(NestedRouterMixin, routers.DefaultRouter):
    pass


router = NestedDefaultRouter()

# Organisations app
organisations_router = router.register(
    'organisations', OrganisationViewSet
)

# api basic app
# api_basic_router = router.register(
#     'api-basic', ApiBasicViewSet
# )

# api basic app
notifications_router = router.register(
    'notifications', NotificationsViewSet
)
# api basic app
documents_router = router.register(
    'documents', DocumentsViewSet
)
# api basic app
receipts_router = router.register(
    'receipts', ReceiptsViewSet
)

# Users app
users_router = router.register(
    'users', CustomUserViewSet
)

urlpatterns = [
    url(r'v1/', include(router.urls)),
    url(r'auth/', include('rest_auth.urls')),
    url(r'auth/registration/', include('rest_auth.registration.urls')),

    url('auth/obtain/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    url('auth/verify/', TokenVerifyView.as_view(), name='token_verify')
]
