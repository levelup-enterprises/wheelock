import React, { useState, useEffect, useCallback } from "react";
import { updateNote, emailNote } from "../services/post";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import session from "../services/session";
// Components
import Input from "./inputs/input";
import Textarea from "./inputs/textarea";
import Button from "../components/common/button";
import Loading from "../components/common/loading";

const Notes = ({ link, id, existingNote = [{}] }) => {
  const [loading, setLoading] = useState(false);
  const [existingNoteValues, updateExistingNoteValues] = useState("");
  const [showNote, toggleShowNote] = useState(false);
  const [showEmail, toggleShowEmail] = useState(false);
  const [emailList, updateEmailList] = useState([]);
  const [emailValue, updateEmailValue] = useState("");

  // Schema for contact form
  const schema = yup.object().shape({
    note: yup.string().required("Enter a note first."),
  });

  // Form handling
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  //# Build Email List
  const buildEmailList = (list) => {
    if (list.length > 1) {
      let emails = "";
      list.forEach((v, i) => {
        emails += list.length - 1 !== i ? v + ", " : v;
      });
      return emailValue !== "" ? emailValue + ", " + emails : emails;
    } else return emailValue !== "" ? emailValue + ", " + list[0] : list[0];
  };

  //# Build Existing Notes
  const buildNoteValues = useCallback((existingNote) => {
    updateExistingNoteValues(
      existingNote.map((v, i) => (
        <div key={i}>
          {i > 0 && <hr />}
          <div className="note-header" onClick={() => handleEmailList(v.email)}>
            <p>
              <span>User:</span> {v.email ? <b>{v.user}</b> : v.user}
            </p>
            <p>
              <span>Date:</span> {v.date}
            </p>
          </div>
          <p>
            <span>Note:</span>
          </p>
          <p>{v.note}</p>
        </div>
      ))
    );
  }, []);

  //* Handle Email List
  const handleEmailList = (email) => {
    let list = emailList;
    list.push(email);
    updateEmailList(list);
    updateEmailValue(buildEmailList(list));
    toggleShowEmail(true);
  };

  useEffect(() => {
    if (existingNote) {
      buildNoteValues(JSON.parse(existingNote));
      toggleShowNote(true);
    }
  }, [existingNote, buildNoteValues]);

  const cancelEmail = (e) => {
    e.preventDefault();
    toggleShowEmail(false);
  };

  const share = (e) => {
    e.preventDefault();
    toggleShowEmail(true);
  };

  //*-----------------------------------
  //# Form submits
  //*-----------------------------------

  const onSubmit = async (values) => {
    values.id = id;
    console.log(values);
    setLoading(true);

    const { success, error } = await updateNote(values);
    if (success) {
      toast.success(success.message);
      session.remove("comments");
      const note = { note: values.note, date: "Just now", user: "Me" };
      if (existingNote) {
        existingNote = JSON.parse(existingNote);
        existingNote.push(note);
        buildNoteValues(existingNote);
      } else {
        buildNoteValues([note]);
        toggleShowNote(true);
      }
    }
    error && toast.error(error.message);
    setLoading(false);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    console.log(emailValue);
    setLoading(true);

    const { success, error } = await emailNote({ id: link, email: emailValue });
    if (success) {
      toast.success(success.message);
    }
    error && toast.error(error.message);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {showNote && (
            <div className="note-container">{existingNoteValues}</div>
          )}
          <Textarea
            name="note"
            className="form-control"
            placeholder="Add a note..."
            fullWidth={true}
            register={register}
            error={errors.note?.message}
          />
          {showEmail && (
            <>
              <Input
                type="text"
                value={emailValue}
                onChange={(e) => updateEmailValue(e)}
                name="email"
                placeholder="Send an email to"
                fullWidth={true}
                className="form-control"
                register={register}
                small="You can add multiple emails by separating them with a comma."
                error={errors.email?.message}
              />
            </>
          )}
          {loading ? (
            <Loading />
          ) : !showEmail ? (
            <>
              <Button className="btn btn-primary reviewed" text="Save" />
              <Button
                className="btn btn-secondary share"
                onClick={(e) => share(e)}
                text="Share"
              />
            </>
          ) : (
            <>
              <Button
                className="btn btn-success share"
                onClick={(e) => sendEmail(e)}
                text="Send"
              />
              <Button
                className="btn btn-warning share"
                onClick={(e) => cancelEmail(e)}
                text="Cancel"
              />
            </>
          )}
        </form>
      )}
    </>
  );
};

export default Notes;
