alias TrelloTribute.Accounts.User
alias TrelloTribute.Repo

users = [
  %{
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    password: "12345678",
    password_confirmation: "12345678"
  },
  %{
    first_name: "Jane",
    last_name: "Smith",
    email: "jane@example.com",
    password: "12345678",
    password_confirmation: "12345678"
  }
]

Enum.each(users, fn attrs ->
  case Repo.get_by(User, email: attrs.email) do
    nil ->
      %User{}
      |> User.changeset(attrs)
      |> Repo.insert!()
    _user ->
      IO.puts("User #{attrs.email} already exists")
  end
end)
