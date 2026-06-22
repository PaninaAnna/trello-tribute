defmodule TrelloTributeWeb.BoardChannel do
  use TrelloTributeWeb, :channel

  def join("boards:" <> board_id, _params, socket) do
    {:ok, %{board_id: board_id}, socket}
  end
end
