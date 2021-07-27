from .profile import ProfilesApi, ProfileApi, AmountApi

def initialize_routes(api):
    api.add_resource(ProfilesApi, '/api/profiles')
    api.add_resource(ProfileApi, '/api/profiles/<id>')
    api.add_resource(AmountApi, '/api/amount')