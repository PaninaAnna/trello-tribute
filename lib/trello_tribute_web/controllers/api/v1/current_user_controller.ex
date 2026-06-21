defmodule TrelloTributeWeb.Api.V1.CurrentUserController do
  use TrelloTributeWeb, :controller

  plug Guardian.Plug.EnsureAuthenticated

  def show(conn, _params) do
    user = Guardian.Plug.current_resource(conn)

    conn
    |> put_status(:ok)
    |> put_resp_header("content-type", "application/json")
    |> json(%{
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    })
  end
end
