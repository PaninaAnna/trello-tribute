defmodule TrelloTribute.Accounts do
  @moduledoc """
  Контекст для работы с пользователями.
  """

  alias TrelloTribute.Accounts.User
  alias TrelloTribute.Repo

  def create_user(attrs) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def get_user_by_email(email) do
    Repo.get_by(User, email: String.downcase(email))
  end

  def get_user_by_id(id) do
    Repo.get(User, id)
  end

  def authenticate_user(email, password) do
    user = get_user_by_email(email)

    case user do
      nil -> {:error, "Invalid email or password"}
      _ ->
        if Bcrypt.verify_pass(password, user.encrypted_password) do
          {:ok, user}
        else
          {:error, "Invalid email or password"}
        end
    end
  end
end
