defmodule TrelloTributeWeb.Api.V1.SessionController do
  use TrelloTributeWeb, :controller

  alias TrelloTribute.Accounts
  alias TrelloTribute.Guardian

  def create(conn, %{"session" => %{"email" => email, "password" => password}}) do
    case Accounts.authenticate_user(email, password) do
      {:ok, user} ->
        {:ok, token, _claims} = Guardian.encode_and_sign(user)

        conn
        |> put_status(:created)
        |> json(%{
          jwt: token,
          user: %{
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          }
        })

      {:error, message} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{error: message})
    end
  end

  def create(conn, _) do
    conn
    |> put_status(:bad_request)
    |> json(%{error: "Invalid request"})
  end

  def delete(conn, _) do
    conn
    |> put_status(:ok)
    |> json(%{ok: true})
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(:forbidden)
    |> json(%{error: "Not authenticated"})
  end
end
