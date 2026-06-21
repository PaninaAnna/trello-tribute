defmodule TrelloTributeWeb.Api.V1.RegistrationController do
  use TrelloTributeWeb, :controller

  alias TrelloTribute.Accounts.User
  alias TrelloTribute.Repo

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> json(%{
          user: %{
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
          }
        })

      {:error, changeset} ->
        errors = Enum.map(changeset.errors, fn {field, {message, _}} ->
          %{field => message}
        end)

        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: errors})
    end
  end
end
