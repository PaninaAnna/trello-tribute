defmodule TrelloTribute.Repo do
  use Ecto.Repo,
    otp_app: :trello_tribute,
    adapter: Ecto.Adapters.Postgres
end
