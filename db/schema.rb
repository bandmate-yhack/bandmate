# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151108131408) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "Projects_Users", id: false, force: :cascade do |t|
    t.integer "project_id", null: false
    t.integer "user_id",    null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "owner_id"
  end

  create_table "projects_users", id: false, force: :cascade do |t|
    t.integer "project_id", null: false
    t.integer "user_id",    null: false
  end

  create_table "stems", force: :cascade do |t|
    t.string   "instrument"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "track_id"
  end

  add_index "stems", ["track_id"], name: "index_stems_on_track_id", using: :btree

  create_table "tracks", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "project_id"
  end

  add_index "tracks", ["project_id"], name: "index_tracks_on_project_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "image"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_foreign_key "stems", "tracks"
  add_foreign_key "tracks", "projects"
end
