import Time "mo:core/Time";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Order "mo:core/Order";

actor {
  type RoutineId = Nat;
  type Timestamp = Time.Time;

  type Routine = {
    id : RoutineId;
    name : Text;
    description : Text;
    scheduledTime : Text;
    isCompleted : Bool;
    timestamp : Timestamp;
  };

  module Routine {
    public func compareByScheduledTime(a : Routine, b : Routine) : Order.Order {
      Text.compare(a.scheduledTime, b.scheduledTime);
    };
  };

  var nextId : RoutineId = 0;
  let routines = Map.empty<RoutineId, Routine>();

  public shared ({ caller }) func addRoutine(name : Text, description : Text, scheduledTime : Text) : async RoutineId {
    let id = nextId;
    let routine : Routine = {
      id;
      name;
      description;
      scheduledTime;
      isCompleted = false;
      timestamp = Time.now();
    };
    routines.add(id, routine);
    nextId += 1;
    id;
  };

  public shared ({ caller }) func editRoutine(id : RoutineId, name : Text, description : Text, scheduledTime : Text) : async () {
    switch (routines.get(id)) {
      case (null) { Runtime.trap("Routine not found") };
      case (?existing) {
        let updatedRoutine : Routine = {
          id = existing.id;
          name;
          description;
          scheduledTime;
          isCompleted = existing.isCompleted;
          timestamp = existing.timestamp;
        };
        routines.add(id, updatedRoutine);
      };
    };
  };

  public shared ({ caller }) func markRoutineCompleted(id : RoutineId) : async () {
    switch (routines.get(id)) {
      case (null) { Runtime.trap("Routine not found") };
      case (?existing) {
        let updatedRoutine : Routine = {
          id = existing.id;
          name = existing.name;
          description = existing.description;
          scheduledTime = existing.scheduledTime;
          isCompleted = true;
          timestamp = existing.timestamp;
        };
        routines.add(id, updatedRoutine);
      };
    };
  };

  public query ({ caller }) func getRoutine(id : RoutineId) : async Routine {
    switch (routines.get(id)) {
      case (null) { Runtime.trap("Routine not found") };
      case (?routine) { routine };
    };
  };

  public query ({ caller }) func getAllRoutines() : async [Routine] {
    routines.values().toArray().sort(Routine.compareByScheduledTime);
  };

  public shared ({ caller }) func deleteRoutine(id : RoutineId) : async () {
    if (not routines.containsKey(id)) {
      Runtime.trap("Routine not found");
    };
    routines.remove(id);
  };
};
