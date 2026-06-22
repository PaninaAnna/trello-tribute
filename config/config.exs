# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :trello_tribute,
  ecto_repos: [TrelloTribute.Repo],
  generators: [timestamp_type: :utc_datetime]

# Configure the endpoint
config :trello_tribute, TrelloTributeWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [html: TrelloTributeWeb.ErrorHTML, json: TrelloTributeWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: TrelloTribute.PubSub,
  live_view: [signing_salt: "tFlY76b/"]

# Configure LiveView
config :phoenix_live_view,
  root_tag_attribute: "phx-r"

# Configure the mailer
config :trello_tribute, TrelloTribute.Mailer, adapter: Swoosh.Adapters.Local

# Configure esbuild
config :esbuild,
  version: "0.25.4",
  trello_tribute: [
    args:
      ~w(js/app.js --bundle --target=es2022 --outdir=../priv/static/assets/js --external:/fonts/* --external:/images/* --alias:@=.),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => [Path.expand("../deps", __DIR__), Mix.Project.build_path()]}
  ]

# Configure tailwind
config :tailwind,
  version: "4.3.0",
  trello_tribute: [
    args: ~w(
      --input=assets/css/app.css
      --output=priv/static/assets/css/app.css
    ),
    cd: Path.expand("..", __DIR__),
    env: %{"NODE_PATH" => [Path.expand("../deps", __DIR__), Mix.Project.build_path()]}
  ]

# Configure Guardian for JWT authentication
config :trello_tribute, TrelloTribute.Guardian,
  issuer: "trello_tribute",
  secret_key: "QpvThnbdqo9f6/NhEQpbXmSOJLjDePOEpLjRRw7I9sYBbsyMQUvIHiXPh0AGT8/Y"

config :guardian, Guardian.Plug,
  module: TrelloTribute.Guardian

# Configure Elixir's Logger
config :logger, :default_formatter,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
