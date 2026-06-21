defmodule TrelloTribute.Guardian do
  use Guardian, otp_app: :trello_tribute

  alias TrelloTribute.Accounts
  alias TrelloTribute.Accounts.User

  def subject_for_token(user = %User{}, _claims) do
    {:ok, "user:#{user.id}"}
  end

  def subject_for_token(_, _) do
    {:error, "Unknown resource"}
  end

  def resource_from_claims(%{"sub" => "user:" <> id}) do
    case Accounts.get_user_by_id(String.to_integer(id)) do
      nil -> {:error, "User not found"}
      user -> {:ok, user}
    end
  end

  def resource_from_claims(_) do
    {:error, "Unknown resource"}
  end
end
