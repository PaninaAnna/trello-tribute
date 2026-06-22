defmodule TrelloTributeWeb.Api.V1.BoardController do
  use TrelloTributeWeb, :controller

  alias TrelloTribute.Accounts

  def index(conn, _params) do
    user = get_current_user(conn)

    if user do
      boards = Accounts.get_user_boards(user)

      # Преобразуем Ecto структуры в map для JSON
      boards_json = Enum.map(boards, fn board ->
        %{
          id: board.id,
          name: board.name,
          user_id: board.user_id,
          inserted_at: board.inserted_at,
          updated_at: board.updated_at
        }
      end)

      conn
      |> put_status(:ok)
      |> json(%{owned_boards: boards_json})
    else
      conn
      |> put_status(:unauthorized)
      |> json(%{error: "Unauthorized"})
    end
  end

  def create(conn, %{"board" => board_params}) do
    user = get_current_user(conn)

    if user do
      case Accounts.create_board(user, board_params) do
        {:ok, board} ->
          conn
          |> put_status(:created)
          |> json(%{
            id: board.id,
            name: board.name,
            user_id: board.user_id,
            inserted_at: board.inserted_at,
            updated_at: board.updated_at
          })

        {:error, changeset} ->
          errors = Enum.map(changeset.errors, fn {field, {message, _}} ->
            %{field => message}
          end)

          conn
          |> put_status(:unprocessable_entity)
          |> json(%{errors: errors})
      end
    else
      conn
      |> put_status(:unauthorized)
      |> json(%{error: "Unauthorized"})
    end
  end

  defp get_current_user(conn) do
    case get_req_header(conn, "authorization") do
      ["Bearer " <> token] ->
        case TrelloTribute.Guardian.decode_and_verify(token) do
          {:ok, claims} ->
            case TrelloTribute.Guardian.resource_from_claims(claims) do
              {:ok, user} -> user
              _ -> nil
            end
          _ -> nil
        end
      _ -> nil
    end
  end
end
