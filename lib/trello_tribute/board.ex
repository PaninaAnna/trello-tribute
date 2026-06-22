defmodule TrelloTribute.Board do
  use Ecto.Schema
  import Ecto.Changeset

  alias TrelloTribute.Accounts.User

  schema "boards" do
    field :name, :string
    belongs_to :user, User

    timestamps()
  end

  @required_fields ~w(name user_id)a
  @optional_fields ~w()a

  def changeset(board, attrs \\ %{}) do
    board
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end
