defmodule TrelloTributeWeb.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "users:*", TrelloTributeWeb.UserChannel
  channel "boards:*", TrelloTributeWeb.BoardChannel

  def connect(%{"token" => token}, socket) do
    case TrelloTribute.Guardian.decode_and_verify(token) do
      {:ok, claims} ->
        case TrelloTribute.Guardian.resource_from_claims(claims) do
          {:ok, user} ->
            {:ok, assign(socket, :current_user, user)}
          {:error, _reason} ->
            :error
        end
      {:error, _reason} ->
        :error
    end
  end

  def connect(_params, _socket) do
    :error
  end

  def id(socket) do
    "users_socket:#{socket.assigns.current_user.id}"
  end
end
