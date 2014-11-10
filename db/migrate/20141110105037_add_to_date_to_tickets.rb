class AddToDateToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :to_date, :timestamp
  end
end
