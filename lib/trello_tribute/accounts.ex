defmodule TrelloTribute.Accounts do
  @moduledoc """
  Контекст для работы с пользователями.
  """

  alias TrelloTribute.Accounts.User
  alias TrelloTribute.Board
  alias TrelloTribute.Repo

  import Ecto.Query  # <-- добавляем

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

  # Функции для досок
  def get_user_boards(user) do
    query = from b in Board, where: b.user_id == ^user.id
    Repo.all(query)
  end

  def create_board(user, attrs) do
    %Board{user_id: user.id}
    |> Board.changeset(attrs)
    |> Repo.insert()
  end
end
